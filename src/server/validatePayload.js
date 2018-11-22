function validatePayload(payload) {
  if (!stringIsValid(payload.subject)) {
    return false;
  }

  if (!stringIsValid(payload.text)) {
    return false;
  }

  if (!stringIsValid(payload.html)) {
    return false;
  }

  return true;
}

function stringIsValid(value) {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return false;
  }

  return true;
}

module.exports = validatePayload;