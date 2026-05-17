// API Base URL
const API_BASE_URL = '/api/prescription';

// DOM Elements
const prescriptionGrid = document.getElementById('prescriptionGrid');
const modalOverlay = document.getElementById('prescriptionModal');
const openAddModalBtn = document.getElementById('openAddModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelFormBtn = document.getElementById('cancelFormBtn');
const prescriptionForm = document.getElementById('prescriptionForm');
const modalTitle = document.getElementById('modalTitle');
const toastContainer = document.getElementById('toastContainer');

// Stats Elements
const statTotalPatients = document.getElementById('statTotalPatients');
const statTotalMeds = document.getElementById('statTotalMeds');

// Form Inputs
const prescriptionIdInput = document.getElementById('prescriptionId');
const patientNameInput = document.getElementById('patientName');
const medicationNameInput = document.getElementById('medicationName');
const dosageInput = document.getElementById('dosage');
const frequencyInput = document.getElementById('frequency');
const reminderTimeInput = document.getElementById('reminderTime');

// State
let prescriptions = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchPrescriptions();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    openAddModalBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    cancelFormBtn.addEventListener('click', closeModal);
    prescriptionForm.addEventListener('submit', handleFormSubmit);

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// API Functions
async function fetchPrescriptions() {
    try {
        const response = await fetch(`${API_BASE_URL}/getall`);
        const data = await response.json();

        prescriptions = data;
        updateStats();
        renderPrescriptions();
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        showToast('Failed to load prescriptions', 'error');
        prescriptionGrid.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 16px; color: var(--danger)">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3>Connection Error</h3>
                <p>Could not connect to the API server.</p>
            </div>
        `;
    }
}

async function createPrescription(data) {
    try {
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast('Prescription added successfully', 'success');
            closeModal();
            fetchPrescriptions();
        } else {
            throw new Error('Failed to create');
        }
    } catch (error) {
        console.error('Error creating:', error);
        showToast('Failed to add prescription', 'error');
    }
}

async function updatePrescription(id, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast('Prescription updated successfully', 'success');
            closeModal();
            fetchPrescriptions();
        } else {
            throw new Error('Failed to update');
        }
    } catch (error) {
        console.error('Error updating:', error);
        showToast('Failed to update prescription', 'error');
    }
}

async function deletePrescription(id) {
    if (!confirm('Are you sure you want to delete this reminder?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Prescription deleted', 'success');
            fetchPrescriptions();
        } else {
            throw new Error('Failed to delete');
        }
    } catch (error) {
        console.error('Error deleting:', error);
        showToast('Failed to delete prescription', 'error');
    }
}

// UI Functions
function renderPrescriptions() {
    if (!prescriptions || prescriptions.length === 0) {
        prescriptionGrid.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 16px; color: var(--text-muted)">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3>No Reminders Found</h3>
                <p>Click the "Add New" button to create your first prescription reminder.</p>
            </div>
        `;
        return;
    }

    prescriptionGrid.innerHTML = '';

    prescriptions.forEach(rx => {
        // Handle MongoDB _id vs id
        const id = rx._id || rx.id;

        const card = document.createElement('div');
        card.className = 'prescription-card';
        card.innerHTML = `
            <div class="card-header">
                <div class="patient-info">
                    <h3>${escapeHTML(rx.medicationName)}</h3>
                    <p>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        ${escapeHTML(rx.patientName)}
                    </p>
                </div>
                <div class="card-actions">
                    <button class="btn-icon" onclick="editPrescription('${id}')" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn-icon delete" onclick="deletePrescription('${id}')" title="Delete">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="detail-row">
                    <span class="detail-label">Dosage</span>
                    <span class="detail-value">${escapeHTML(rx.dosage)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Frequency</span>
                    <span class="pill-badge">${escapeHTML(rx.frequency)}</span>
                </div>
                <div class="detail-row" style="margin-top: 8px;">
                    <span class="detail-label">Next Reminder</span>
                    <span class="pill-badge time-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        ${formatTime(rx.reminderTime)}
                    </span>
                </div>
            </div>
        `;
        prescriptionGrid.appendChild(card);
    });
}

function updateStats() {
    if (!prescriptions) return;

    statTotalMeds.textContent = prescriptions.length;

    // Calculate unique patients
    const uniquePatients = new Set(prescriptions.map(rx => rx.patientName));
    statTotalPatients.textContent = uniquePatients.size;
}

// Modal & Form Handling
function openModal(rx = null) {
    prescriptionForm.reset();

    if (rx) {
        modalTitle.textContent = 'Edit Prescription';
        const id = rx._id || rx.id;
        prescriptionIdInput.value = id;
        patientNameInput.value = rx.patientName || '';
        medicationNameInput.value = rx.medicationName || '';
        dosageInput.value = rx.dosage || '';
        frequencyInput.value = rx.frequency || '';
        reminderTimeInput.value = rx.reminderTime || '';
    } else {
        modalTitle.textContent = 'Add Prescription';
        prescriptionIdInput.value = '';
        // Set a default time
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        reminderTimeInput.value = `${hours}:${minutes}`;
    }

    modalOverlay.classList.add('active');

    // Focus first input
    setTimeout(() => patientNameInput.focus(), 100);
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// Ensure editPrescription is available globally for the inline onclick handlers
window.editPrescription = function (id) {
    const rx = prescriptions.find(p => (p._id === id || p.id === id));
    if (rx) {
        openModal(rx);
    }
}

window.deletePrescription = deletePrescription;

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        patientName: patientNameInput.value.trim(),
        medicationName: medicationNameInput.value.trim(),
        dosage: dosageInput.value.trim(),
        frequency: frequencyInput.value,
        reminderTime: reminderTimeInput.value
    };

    const id = prescriptionIdInput.value;

    if (id) {
        updatePrescription(id, formData);
    } else {
        createPrescription(formData);
    }
}

// Utilities
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
        ${icon}
        <span style="font-weight: 500">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function formatTime(timeStr) {
    if (!timeStr) return '';
    try {
        let cleanStr = timeStr.replace(/\s*(AM|PM|am|pm)\s*/g, '');
        const parts = cleanStr.split(':');
        if (parts.length < 2) return timeStr;
        
        const h = parseInt(parts[0], 10);
        if (isNaN(h)) return timeStr;
        
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedH = h % 12 || 12;
        const cleanMins = parts[1].trim().substring(0, 2);
        
        return `${formattedH}:${cleanMins} ${ampm}`;
    } catch (e) {
        return timeStr;
    }
}

function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
