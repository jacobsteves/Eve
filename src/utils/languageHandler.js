export function languageHandler(name) {
  if (name === 'js') {
    return 'javascript';
  } else if (name === 'json') {
    return 'json';
  } else if (name === 'php') {
    return 'php';
  } else if (name === 'md') {
    return 'markdown';
  }
  return 'html';
}
