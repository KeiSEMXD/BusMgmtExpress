const API_BASE = '/api/buses';

export async function getBuses() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function getBus(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return res.json();
}

export async function createBus(bus) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bus),
  });
  return res.json();
}

export async function updateBus(id, bus) {
  await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bus),
  });
}

export async function deleteBus(id) {
  await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
}
