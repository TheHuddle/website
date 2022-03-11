export const HuddleValidators = {
  discord: (control) => {
    const handle = control?.value;

    if (handle[0] !== '@') {
      control.setValue(`@${handle}`);
    }

    if (/#/.test(handle)) {
      return { globalHandle: true };
    }

    return null;
  },
  passwordsMatch: (group) => {
    const password = group.get('password')?.value;
    const confirm = group.get('passwordconfirm')?.value;

    if (!password || !confirm || password === confirm) {
      return null;
    } else {
      return { passwordDoesNotMatch: true };
    }
  },
};
