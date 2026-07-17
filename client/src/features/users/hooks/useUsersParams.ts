import { useSearchParams } from 'react-router';

const parseList = (value: string | null): string[] => {
  if (!value) return [];
  return value
    .split('-')
    .map((part) => part.trim())
    .filter(Boolean);
};

export const useUsersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string): string => {
    return searchParams.get(key) ?? '';
  };

  const setParam = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (!value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };

  const getListParam = (key: string): string[] => {
    return parseList(searchParams.get(key));
  };

  const setListParamValue = (key: string, value: string, enabled: boolean) => {
    const current = getListParam(key);
    const hasValue = current.includes(value);

    if (enabled === hasValue) return;

    const next = enabled ? [...current, value] : current.filter((item) => item !== value);
    const nextParams = new URLSearchParams(searchParams);

    if (next.length === 0) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, next.join('-'));
    }

    setSearchParams(nextParams);
  };

  const clearListParam = (key: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete(key);
    setSearchParams(nextParams);
  };

  return {
    getParam,
    setParam,
    getListParam,
    setListParamValue,
    clearListParam,
  };
};
