document.addEventListener('DOMContentLoaded', () => {
  console.log("PDVSA Admin Dashboard Loaded");

  // Future dynamic functionalities like:
  // - Fetching data from APIs
  // - Expanding side menus
  // - Confirmations
});


async function approveKYC(id) {
  const res = await fetch(`/api/admin/kyc/${id}/approve`, { method: 'POST' });
  if (res.ok) {
    alert('Approved');
    location.reload();
  } else {
    alert('Error approving');
  }
}

async function rejectKYC(id) {
  const res = await fetch(`/api/admin/kyc/${id}/reject`, { method: 'POST' });
  if (res.ok) {
    alert('Rejected');
    location.reload();
  } else {
    alert('Error rejecting');
  }
}
