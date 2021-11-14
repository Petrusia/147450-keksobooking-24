const ERROR_SHOW_TIME = 3000;

export const showErrorMsg = (message) => {
  const container = document.createElement('div');

  container.style.zIndex = 100;
  container.style.position = 'absolute';
  container.style.left = 0;
  container.style.top = 0;
  container.style.right = 0;
  container.style.padding = '10px 3px';
  container.style.fontSize = '26px';
  container.style.textAlign = 'center';
  container.style.backgroundColor = 'red';
  container.style.color = 'white';
  container.textContent = message;

  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, ERROR_SHOW_TIME);
};
