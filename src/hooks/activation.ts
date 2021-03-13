import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { fetchActivationStatus } from "../store/reducers/activation";

export function useActivationStatus() {
  const [isActivated, setIsActivated] = useState<boolean | undefined>(false);
  const dispatch = useDispatch();

  const { activation, isLoading } = useSelector(
    ({ activation: { isLoading, activation } }: RootState) => ({
      isLoading,
      activation,
    })
  );

  useEffect(() => {
    if (!activation) {
      dispatch(fetchActivationStatus());
    }
  }, [activation, dispatch]);

  useEffect(() => {
    if (!isLoading) {
        setIsActivated(activation?.activated || false);
    }
  }, [setIsActivated, activation, isLoading]);

  return [isActivated, isLoading];
}
