const generateCertificateId = () => {
  const year = new Date().getFullYear();
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AMT-${year}-${randomPart}`;
};

export default generateCertificateId;
