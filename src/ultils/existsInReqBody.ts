export default (value: string, type: string) => {
  if (!value) throw new Error(`o(a) ${type} é obrigatorio(a)!`);
};
