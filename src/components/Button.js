function Button({buttonName, buttonIcon}) {
  return (
    <button className="mdc-button mdc-button--raised">
      <span className="mdc-button__ripple"></span>
      <i className="material-icons mdc-button__icon" aria-hidden="true">
        {buttonIcon}
      </i>
      <span className="mdc-button__label">{buttonName}</span>
    </button>
  );
}

export default Button;
