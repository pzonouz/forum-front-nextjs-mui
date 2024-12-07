const translate = (text: string | null | undefined) => {
  let translated = "";
  if (text?.trim().includes("already exists")) {
    translated = "قبلا ثبت شده است";
  }
  return translated;
};

export { translate };
