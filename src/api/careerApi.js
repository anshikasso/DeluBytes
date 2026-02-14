const API_BASE = import.meta.env.VITE_API_URL || '';

export async function getRoles() {
  const res = await fetch(`${API_BASE}/api/roles`);
  if (!res.ok) throw new Error('Failed to fetch roles');
  return res.json();
}

export async function analyzeProfile({ resumeFile, resumeText, githubUrl, linkedinUrl, role }) {
  const formData = new FormData();
  if (resumeFile) {
    formData.append('resume_file', resumeFile);
  }
  if (resumeText) {
    formData.append('resume_text', resumeText);
  }
  if (githubUrl) {
    formData.append('github_url', githubUrl);
  }
  if (linkedinUrl) {
    formData.append('linkedin_url', linkedinUrl);
  }
  formData.append('role', role || 'Full Stack Developer');

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Analysis failed: ${res.status}`);
  }

  return res.json();
}
