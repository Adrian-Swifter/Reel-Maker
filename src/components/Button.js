function Button({buttonName, buttonIcon, handleVisibility, visibility}) {
  return (
    <button className="mdc-button mdc-button--raised" onClick={handleVisibility}>
      <span className="mdc-button__ripple"></span>
      <i className="material-icons mdc-button__icon" aria-hidden="true">
        {buttonIcon}
      </i>
      <span className="mdc-button__label">{visibility ? "Enter folder name" : buttonName}</span>
    </button>
  );
}

export default Button;
