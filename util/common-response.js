const HEADER_ACCEPT = 'accept';
const HEADER_VALUE_APPLICATION_JSON = 'application/json';

function acceptsJsonHeader(req) {
  try {
    return req.headers[HEADER_ACCEPT].includes(HEADER_VALUE_APPLICATION_JSON);
  } catch (err) {
    return false;
  }
}

function setResponseWithError(res, status, message, code = 'error', data = []) {
  res.status(status);
  res.send({ code, message, data});
  return res
}

function setResponseWithOk(res, status, message, code = 'ok', data = []) {
  res.status(status);
  res.send({ code, message, data });
  return res;
}
/*
function setResponseRaw(res, status, message) {
  return res.status(status).send(message);
}
*/
function sendRedirect(res, status, urlRedirect) {
  return res.redirect(status, urlRedirect);
}

module.exports.acceptsJsonHeader = acceptsJsonHeader;
module.exports.setResponseWithError = setResponseWithError;
module.exports.setResponseWithOk = setResponseWithOk;
//module.exports.setResponseRaw = setResponseRaw;
module.exports.sendRedirect = sendRedirect;