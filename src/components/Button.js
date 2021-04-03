function Button() {
  return (
    <button class="mdc-button mdc-button--raised">
      <span class="mdc-button__ripple"></span>
      <i class="material-icons mdc-button__icon" aria-hidden="true">
        create_new_folder
      </i>
      <span class="mdc-button__label">New Folder</span>
    </button>
  );
}

export default Button;
