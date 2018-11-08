function validatePayload(payload) {
  if (!emailAddressIsValid(payload.to)) {
    return false;
  }

  return true;
}

function emailAddressIsValid(emailAddress) {
  if (!emailAddress || emailAddress === '' || typeof emailAddress !== 'string') {
    return false;
  }

  if(!emailAddress.match(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)) {
    return false;
  }

  return true;
}

module.exports = validatePayload;