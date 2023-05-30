interface createPrefixNameSliceOverload {
  <N extends string>(name: N): {
    <S extends string>(suffix: S): `${N}/${S}`;
    <S extends undefined>(suffix?: S): N;
  };
}

// TODO: FIX THIS TYPE
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const createPrefixNameSlice: createPrefixNameSliceOverload = (name) => {
  return (suffix: any) => {
    return suffix ? `${name}/${suffix}` : name;
  };
};
