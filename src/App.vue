<script setup lang="ts">
import { ref, onMounted } from "vue";

// Typer for dataene
interface WPPost {
    id: number;
    title: { rendered: string };
    link: string;
    date: string;
}

const posts = ref<WPPost[]>([]);
const dummyMessage = ref("");
const loading = ref(true);

onMounted(async () => {
    const WP_DATA = (window as any).WP_DATA;

    if (!WP_DATA) {
        console.warn(
            "WP_DATA er ikke tilgjengelig. Sjekk admin_enqueue_scripts.",
        );
        return;
    }

    try {
        // 1. Hent posts (Standard)
        const postRes = await fetch(`${WP_DATA.restUrl}wp/v2/posts`, {
            headers: { "X-WP-Nonce": WP_DATA.nonce },
        });
        posts.value = await postRes.json();

        // 2. Hent fra ditt nye custom endepunkt
        const dummyRes = await fetch(`${WP_DATA.restUrl}custom/v1/dummy`, {
            headers: { "X-WP-Nonce": WP_DATA.nonce },
        });
        const dummyData = await dummyRes.json();
        dummyMessage.value = dummyData.message;

        console.log("Custom API svar:", dummyData);
    } catch (error) {
        console.error("Kunne ikke hente data:", error);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="plugin">
        <img src="@/assets/nett-opp-it-logo.png" alt="Logo" />
        <h1>Core Plugin</h1>

        <!-- Viser meldingen fra PHP custom endepunkt -->
        <p v-if="dummyMessage" class="api-msg">
            Melding fra API: {{ dummyMessage }}
        </p>

        <p>Åpne konsollen (F12) for mer info...</p>
        <hr />

        <div v-if="!loading" style="width: 100%">
            <table v-if="posts.length">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tittel</th>
                        <th>Lenke</th>
                        <th>Dato</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" :key="post.id">
                        <td data-label="ID">{{ post.id }}</td>
                        <td
                            data-label="Tittel"
                            v-html="post.title.rendered"
                        ></td>
                        <td data-label="Lenke">
                            <a
                                :href="post.link"
                                target="_blank"
                                class="button button-small"
                                >Se innlegg</a
                            >
                        </td>
                        <td data-label="Dato">
                            {{ new Date(post.date).toLocaleDateString() }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else>Ingen innlegg funnet.</p>
        </div>

        <div v-else>
            <p>Laster innlegg...</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.plugin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    .api-msg {
        background: #e7f3ff;
        padding: 10px;
        border-radius: 5px;
        color: #007acc;
        font-weight: bold;
    }

    img {
        width: 200px;
        max-width: 100%;
    }

    h1 {
        color: $primary-text-color;
        font-size: 2em;
    }

    p {
        color: $secondary-text-color;
        font-size: 1em;
    }

    hr {
        width: 100%;
        margin: 20px 0;
        border: 0;
        border-top: 1px solid #ddd;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.95em;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        thead {
            background-color: #007acc;
            color: white;
            text-align: left;

            th {
                padding: 12px 15px;
            }
        }

        tbody {
            tr {
                border-bottom: 1px solid #ddd;
                transition: background-color 0.2s;

                &:nth-child(even) {
                    background-color: #f9f9f9;
                }

                &:hover {
                    background-color: #e6f7ff;
                }

                td {
                    padding: 10px 15px;

                    a {
                        color: #007acc;
                        text-decoration: none;
                        font-weight: 500;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        table,
        thead,
        tbody,
        th,
        td,
        tr {
            display: block;
        }

        thead tr {
            display: none;
        }

        tbody tr {
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
        }

        tbody td {
            display: flex;
            justify-content: space-between;
            padding: 8px 10px;
            border-bottom: 1px solid #eee;

            &:last-child {
                border-bottom: 0;
            }

            &::before {
                content: attr(data-label);
                font-weight: bold;
                color: #555;
            }
        }
    }
}
</style>
