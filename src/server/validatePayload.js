function validatePayload(payload) {
  if (!emailAddressIsValid(payload.to)) {
    return false;
  }

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

function emailAddressIsValid(emailAddress) {
  if (!emailAddress || typeof emailAddress !== 'string' || emailAddress.trim() === '') {
    return false;
  }

  if(!emailAddress.match(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)) {
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