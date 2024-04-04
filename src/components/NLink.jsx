const NLink = ({ children, className, ...props }) => (
  <NavLin
    {...props}
    className={({ isActive, isPending }) =>
      isPending
        ? "pending"
        : isActive
        ? cn(
            className,
            "active transition-colors text-primary/90 hover:text-primary"
          )
        : cn(
            className,
            "transition-colors text-foreground/90 hover:text-foreground"
          )
    }
  >
    {children}
  </NavLin>
);

export default NLink
