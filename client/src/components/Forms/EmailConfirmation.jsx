import { Input } from "../ui/input";

const EmailConfirmation = ({
  email,
  updateFields,
}) => {
  return (
    <>
      <div className="w-full space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
          required
          autoFocus
        />
      </div>
    </>
  );
};

export default EmailConfirmation;
