const FormHeading = ({ step }) => {
  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold leading-7 text-foreground">
        {step.name}
      </h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {step.details}
      </p>
    </div>
  );
};

export default FormHeading;
