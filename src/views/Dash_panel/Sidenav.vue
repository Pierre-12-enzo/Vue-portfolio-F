<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath;
}
</script>

<template>
 
        <aside id="sidebar" class="sidebar">
            <ul class="sidebar-nav">
                <li class="sidebar-item">
                    <RouterLink to="/dashboard" :class="[isActiveLink('/dashboard') ? 'active sidebar-link' : 'sidebar-link','p-3']">
                        <i class="bi bi-speedometer2"></i>
                        <span>Dashboard</span>
                    </RouterLink>
                </li>
                <li class="sidebar-item">
                    <RouterLink to="/dashboard/works" :class="[isActiveLink('/dashboard/works') ? 'active sidebar-link' : 'sidebar-link','p-3']">
                        <i class="bi bi-plus"></i>
                        <span>View Works</span>
                    </RouterLink>
                </li>
                <li class="sidebar-item">
                    <RouterLink to="/dashboard/stacks" :class="[isActiveLink('/dashboard/stacks') ? 'active sidebar-link' : 'sidebar-link','p-3']">
                        <i class="bi bi-plus"></i>
                        <span>View Stacks</span>
                    </RouterLink>
                </li>
                <li class="sidebar-item">
                    <RouterLink to="/dashboard/blog" :class="[isActiveLink('/dashboard/blog') ? 'active sidebar-link' : 'sidebar-link','p-3']">
                        <i class="bi bi-plus"></i>
                        <span>Visit The Blog</span>
                    </RouterLink>
                </li>
                <li class="sidebar-item">
                    <RouterLink to="/dashboard/settings" :class="[isActiveLink('/dashboard/settings') ? 'active sidebar-link' : 'sidebar-link','p-3']">
                        <i class="bi bi-gear"></i> 
                         <span>Settings</span>
                    </RouterLink>
                </li>
                </ul>
                </aside>
</template>






















<style scoped>

.sidebar{
    width: 260px;
    min-width: 260px;
    z-index: 1000;
    transition: all .25s ease-in-out;
    background-color: var(--primary-color);
    box-shadow: 10px 5px 15px rgba(33,37,41,.1);
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: fixed;
    margin-top: 6%;
}
.content {
    margin-left: 250px;
    min-height: 100vh;
    background: #FFFFFF;
    transition: 0.5s;
}
@media (min-width: 992px) {
    .sidebar {
        margin-left: 0;
    }

    .sidebar.open {
        margin-left: -250px;
    }

    .content {
        width: calc(100% - 250px);
    }

    .content.open {
        width: 100%;
        margin-left: 0;
    }
}

@media (max-width: 991.98px) {
    .sidebar {
        margin-left: -250px;
    }

    .sidebar.open {
        margin-left: 0;
    }

    .content {
        width: 100%;
        margin-left: 0;
    }
}


.sidebar-nav{
     padding: 2rem 0;
     flex: 1 1 auto;
}
.sidebar-link {
    display: block;
    white-space: nowrap;
    border-left: 2px solid transparent;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #f5f5f5;
    transition: background-color 0.2s ease-in-out, border-left 0.2s ease-in-out;
}

/* Change the background color and border of the sidebar link on hover */
.sidebar-link:hover {
    background-color: #f5f5f5f5;
    color: var(--primary-color);
    border-left: 3px solid var(--font-color);
    border-bottom: 3px solid #8b0841;
    border-top: 3px solid #8b0841;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

}
/* Active link */
.active{
    background-color: #f5f5f5f5;
    border-left: 3px solid var(--font-color);
    color: var(--primary-color);
    border-bottom: 3px solid #8b0841;
    border-top: 3px solid #8b0841;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.text{
    color: var(--font-color);
}
/* Set the styles for the sidebar item */
.sidebar-item {
    /* Add styles here if needed */
    position: relative;
}

</style>