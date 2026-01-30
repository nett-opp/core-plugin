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
const lastUpdated = ref("");

// Funksjon for å hente data (kan kalles ved mount og ved refresh)
const fetchData = async () => {
    const WP_DATA = (window as any).WP_DATA;
    if (!WP_DATA) {
        console.warn("WP_DATA er ikke tilgjengelig.");
        return;
    }

    loading.value = true;
    try {
        const [postRes, dummyRes] = await Promise.all([
            fetch(`${WP_DATA.restUrl}wp/v2/posts`, {
                headers: { "X-WP-Nonce": WP_DATA.nonce },
            }),
            fetch(`${WP_DATA.restUrl}custom/v1/dummy`, {
                headers: { "X-WP-Nonce": WP_DATA.nonce },
            }),
        ]);

        posts.value = await postRes.json();
        const dummyData = await dummyRes.json();
        dummyMessage.value = dummyData.message;

        // Oppdater tidsstempel
        lastUpdated.value = new Date().toLocaleTimeString("no-NO");
    } catch (error) {
        console.error("Dashboard error:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="dashboard-container">
        <!-- Stats Grid -->
        <section class="stats-grid">
            <div class="stat-card">
                <span class="label">Totale Innlegg</span>
                <span class="value">{{ posts.length }}</span>
            </div>
            <div class="stat-card message-card">
                <span class="label">System Melding</span>
                <span class="value small">{{
                    dummyMessage || "Henter melding..."
                }}</span>
            </div>
            <div class="stat-card">
                <span class="label">Siste Oppdatering</span>
                <span class="value small">{{ lastUpdated || "--:--" }}</span>
            </div>
        </section>

        <!-- Main Content -->
        <main class="content-card">
            <div class="card-header">
                <h2>Siste Publiseringer</h2>
                <button
                    @click="fetchData"
                    :disabled="loading"
                    class="refresh-btn"
                >
                    {{ loading ? "Laster..." : "Oppdater data" }}
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="loading && !posts.length" class="skeleton-loader">
                <div v-for="i in 5" :key="i" class="skeleton-row"></div>
            </div>

            <!-- Table -->
            <div v-else class="table-wrapper">
                <table v-if="posts.length">
                    <thead>
                        <tr>
                            <th>Tittel</th>
                            <th>Dato</th>
                            <th class="text-right">Handling</th>
                        </tr>
                    </thead>
                    <tbody :class="{ 'opacity-muted': loading }">
                        <tr v-for="post in posts" :key="post.id">
                            <td
                                class="title-cell"
                                v-html="post.title.rendered"
                            ></td>
                            <td>
                                {{
                                    new Date(post.date).toLocaleDateString(
                                        "no-NO",
                                    )
                                }}
                            </td>
                            <td class="text-right">
                                <a
                                    :href="post.link"
                                    target="_blank"
                                    class="action-link"
                                    >Vis innlegg →</a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="empty-state">
                    <p>Ingen innlegg funnet i databasen.</p>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
    padding: 30px;
    background: $bg-color;
    min-height: 100vh;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
    color: $text-main;

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-bottom: 32px;

        .stat-card {
            background: $card-bg;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid $border;

            .label {
                color: $text-sub;
                font-size: 0.9rem;
                font-weight: 500;
                display: block;
                margin-bottom: 10px;
            }
            .value {
                font-size: 2rem;
                font-weight: 800;
                color: $text-main;
                &.small {
                    font-size: 1.1rem;
                    color: $primary;
                    line-height: 1.4;
                }
            }
        }
    }

    .content-card {
        background: $card-bg;
        border-radius: 16px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        border: 1px solid $border;
        overflow: hidden;

        .card-header {
            padding: 24px;
            border-bottom: 1px solid $border;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h2 {
                font-size: 1.25rem;
                margin: 0;
                font-weight: 700;
            }

            .refresh-btn {
                background: $primary;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.2s;

                // Bruker manuelt definert hover-farge i stedet for darken()
                &:hover:not(:disabled) {
                    background: $primary-hover;
                    transform: translateY(-1px);
                }
                &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            }
        }
    }

    .table-wrapper {
        .opacity-muted {
            opacity: 0.5;
            transition: opacity 0.3s;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            th {
                background: #f8fafc;
                text-align: left;
                padding: 16px 24px;
                color: $text-sub;
                font-weight: 600;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            td {
                padding: 18px 24px;
                border-bottom: 1px solid $border;
                font-size: 0.95rem;
            }
            .title-cell {
                font-weight: 600;
                color: $text-main;
            }
            tr:last-child td {
                border-bottom: none;
            }
            tr:hover {
                background-color: #f8fafc;
            }
        }
    }

    .action-link {
        color: $primary;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.9rem;
        // Bruker CSS filter for mørkere effekt på hover (universelt støttet)
        &:hover {
            filter: brightness(0.85);
        }
    }

    .empty-state {
        padding: 40px;
        text-align: center;
        color: $text-sub;
    }
    .text-right {
        text-align: right;
    }
}

.skeleton-loader {
    padding: 24px;
    .skeleton-row {
        height: 48px;
        background: #f1f5f9;
        margin-bottom: 12px;
        border-radius: 8px;
        animation: pulse 1.5s infinite;
    }
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

@media (max-width: 768px) {
    .dashboard-container {
        padding: 15px;
    }
    .db-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    .stats-grid {
        grid-template-columns: 1fr;
    }
    th:nth-child(2),
    td:nth-child(2) {
        display: none;
    }
}
</style>
