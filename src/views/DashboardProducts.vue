<script setup lang="ts">
import { ref, onMounted } from "vue";

// Typer for WooCommerce Produkter
interface WCProduct {
    id: number;
    name: string;
    permalink: string;
    date_created: string;
    price: string;
    stock_status: string;
}

const products = ref<WCProduct[]>([]);
const dummyMessage = ref("");
const loading = ref(true);
const lastUpdated = ref("");

const fetchData = async () => {
    const WP_DATA = (window as any).WP_DATA;
    if (!WP_DATA) return;

    loading.value = true;
    try {
        const [prodRes, dummyRes] = await Promise.all([
            fetch(`${WP_DATA.restUrl}wc/v3/products`, {
                headers: { "X-WP-Nonce": WP_DATA.nonce },
            }),
            fetch(`${WP_DATA.restUrl}custom/v1/dummy`, {
                headers: { "X-WP-Nonce": WP_DATA.nonce },
            }),
        ]);

        const prodData = await prodRes.json();
        const dummyData = await dummyRes.json();

        // Sikrer at vi har et array, ellers sett til tomt (viser 0)
        products.value = Array.isArray(prodData) ? prodData : [];
        dummyMessage.value = dummyData.message || "";

        lastUpdated.value = new Date().toLocaleTimeString("no-NO");
    } catch (error) {
        console.error("WooCommerce API error:", error);
        products.value = []; // Fallback til 0 ved feil
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
                <span class="label">Totale Produkter</span>
                <!-- Viser 0 hvis listen er tom eller undefined -->
                <span class="value">{{ products?.length || 0 }}</span>
            </div>
            <div class="stat-card message-card">
                <span class="label">System Melding</span>
                <span class="value small">{{
                    dummyMessage || "Ingen melding tilgjengelig"
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
                <h2>Produktliste (WooCommerce)</h2>
                <button
                    @click="fetchData"
                    :disabled="loading"
                    class="refresh-btn"
                >
                    {{ loading ? "Laster..." : "Oppdater produkter" }}
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="loading && !products.length" class="skeleton-loader">
                <div v-for="i in 5" :key="i" class="skeleton-row"></div>
            </div>

            <!-- Table -->
            <div v-else class="table-wrapper">
                <table v-if="products.length">
                    <thead>
                        <tr>
                            <th>Produktnavn</th>
                            <th>Pris</th>
                            <th>Status</th>
                            <th class="text-right">Handling</th>
                        </tr>
                    </thead>
                    <tbody :class="{ 'opacity-muted': loading }">
                        <tr v-for="product in products" :key="product.id">
                            <td class="title-cell">{{ product.name }}</td>
                            <td>
                                {{
                                    product.price
                                        ? product.price + " kr"
                                        : "Gratis"
                                }}
                            </td>
                            <td>
                                <span
                                    class="stock-badge"
                                    :class="product.stock_status"
                                >
                                    {{
                                        product.stock_status === "instock"
                                            ? "På lager"
                                            : "Utsolgt"
                                    }}
                                </span>
                            </td>
                            <td class="text-right">
                                <a
                                    :href="product.permalink"
                                    target="_blank"
                                    class="action-link"
                                    >Vis produkt →</a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="empty-state">
                    <p>Ingen produkter funnet i butikken.</p>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
// Henter variabler fra global eller definerer dem her for sikkerhet
$primary: #007acc;
$primary-hover: #005fa3;
$text-main: #1e293b;
$text-sub: #64748b;
$border: #e2e8f0;
$card-bg: #ffffff;
$bg-color: #f6f8fb;

.stock-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    &.instock {
        background: #dcfce7;
        color: #166534;
    }
    &.outofstock {
        background: #fee2e2;
        color: #991b1b;
    }
}

.dashboard-container {
    padding: 30px;
    background: $bg-color;
    min-height: 100vh;
    font-family:
        "Inter",
        -apple-system,
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
    50% {
        opacity: 0.5;
    }
}
</style>
