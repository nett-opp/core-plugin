<script setup lang="ts">
import { ref, onMounted } from "vue";
console.log("env", import.meta.env);
console.log("WP_DATA", (window as any).WP_DATA || {});
interface WPPost {
    id: number;
    title: { rendered: string };
    link: string;
    date: string;
}
/*
 * https://developer.wordpress.org/rest-api/reference/
 */
const posts = ref<WPPost[]>([]);
onMounted(async () => {
    const WP_DATA = (window as any).WP_DATA;
    if (!WP_DATA) {
        console.warn("WP_DATA is not available. Are you in dev mode?");
        return;
    }
    try {
        const response = await fetch(`${WP_DATA.restUrl}wp/v2/posts`, {
            headers: {
                "X-WP-Nonce": WP_DATA.nonce,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch posts");
        posts.value = await response.json();
        console.log("Posts:", posts.value);
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <div class="plugin">
        <img src="@/assets/nett-opp-it-logo.png" alt="" />
        <h1>Core Plugin</h1>
        <p>Open console (F12) for more info...</p>
        <hr />
        <div v-if="posts.length" style="width: 100%">
            <table border="1" cellpadding="8" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Link</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" :key="post.id">
                        <td data-label="ID">{{ post.id }}</td>
                        <td data-label="Title">{{ post.title.rendered }}</td>
                        <td data-label="Link">
                            <a :href="post.link" target="_blank">View Post</a>
                        </td>
                        <td data-label="Date">
                            {{ new Date(post.date).toLocaleDateString() }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else>
            <p>Loading posts...</p>
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
