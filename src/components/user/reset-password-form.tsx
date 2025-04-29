'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, startTransition } from 'react';
import { resetPassword } from '@/actions';

const initialStateResetPassword = {
  errors: {},
  message: '',
  status: false,
};

const ResetPasswordForm = () => {
  const [formState, action, isPending] = useActionState(
    resetPassword,
    initialStateResetPassword
  );
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }
  return (
    <>
      <form className="flex flex-col min-w-87 p-5 max-w-2xl" action={action}>
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <div className="flex flex-col gap-4 mt-8">
          <div>
            <Label htmlFor="password" className="pb-2">
              New password
            </Label>
            <Input type="password" minLength={6} name="password" />
            {!!formState.errors?.password ? (
              <div className="text-red-400">
                {formState.errors.password?.join(', ')}
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="pb-2">
              Confirm new password
            </Label>
            <Input type="password" minLength={6} name="confirmPassword" />
            {!!formState.errors?.confirmPassword ? (
              <div className="text-red-400">
                {formState.errors.confirmPassword?.join(', ')}
              </div>
            ) : (
              ''
            )}
          </div>

          {!!formState.errors?._form ? (
            <div className="text-red-400">
              {formState.errors._form?.join(', ')}
            </div>
          ) : (
            ''
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="max-w-fit mt-3"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
