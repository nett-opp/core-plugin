<template>
    <div class="dashboard-wrapper">
        <!-- Felles Header & Meny -->
        <header class="db-header-main">
            <div class="brand">
                <img
                    src="@/assets/nett-opp-it-logo.png"
                    alt="Logo"
                    class="logo"
                />
                <nav class="db-nav">
                    <!-- Hovedsiden viser nå Innlegg -->
                    <router-link to="/" class="nav-link">Innlegg</router-link>
                    <router-link to="/products" class="nav-link"
                        >Produkter</router-link
                    >
                </nav>
            </div>
        </header>

        <!-- Her rendres de forskjellige sidene -->
        <main class="db-content">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
    </div>
</template>

<style lang="scss">
// Variabler for enklere vedlikehold
$primary: #007acc;
$text-sub: #64748b;
$bg-color: #f6f8fb;

.dashboard-wrapper {
    background: $bg-color;
    min-height: 100vh;
    padding: 20px;

    .db-header-main {
        background: white;
        padding: 0 40px;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;

        .brand {
            display: flex;
            align-items: center;
            gap: 60px;

            .logo {
                height: 65px;
                width: auto;
                padding: 10px 0;
                display: block;
                object-fit: contain;
            }
        }

        .db-nav {
            display: flex;
            gap: 10px;

            .nav-link {
                padding: 35px 25px;
                text-decoration: none;
                color: $text-sub;
                font-weight: 600;
                font-size: 1rem;
                border-bottom: 4px solid transparent;
                transition: all 0.2s ease;

                &:hover {
                    color: $primary;
                    background: rgba(0, 122, 204, 0.02);
                }

                &.router-link-active {
                    color: $primary;
                    border-bottom-color: $primary;
                }
            }
        }
    }
}

// Transition animasjon mellom views
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
