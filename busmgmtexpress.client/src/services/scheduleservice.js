// src/services/scheduleService.js

export async function getSchedules() {
    const res = await fetch('/api/schedules');
    return await res.json();
}

export async function getSchedule(id) {
    const res = await fetch(`/api/schedules/${id}`);
    return await res.json();
}

export async function createSchedule(schedule) {
    const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule)
    });
    return await res.json();
}

export async function updateSchedule(id, schedule) {
    await fetch(`/api/schedules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule)
    });
}

export async function deleteSchedule(id) {
    await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
}
