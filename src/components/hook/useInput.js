import { useState, useCallback } from "react";

function useInput(initialValues) {
  const [values, setValues] = useState(initialValues);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
    //오케 꼭 이렇게 넘겨줘야하는 데 왠지는 모르겠음 ㅎ.
  }, []);

  const onFileChange = useCallback((e) => {
    setValues((values) => ({ ...values, ["file"]: e.target.file[0] }));
    //오케 꼭 이렇게 넘겨줘야하는 데 왠지는 모르겠음 ㅎ.
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);
  return [values, onChange, onFileChange, reset];
}

export default useInput;
