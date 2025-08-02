// src/services/routeService.js
const API_BASE = '/api/routes';

export async function getRoutes() {
    const res = await fetch(API_BASE);
    return res.json();
}

export async function getRoute(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    return res.json();
}

export async function createRoute(route) {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route),
    });
    return res.json();
}

export async function updateRoute(id, route) {
    await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route),
    });
}

export async function deleteRoute(id) {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}
