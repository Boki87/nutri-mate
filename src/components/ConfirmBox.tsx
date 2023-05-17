import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { closeConfirm } from "../features/modals/modalsSlice";
import { useEffect } from "react";

export const ConfirmBox = () => {
  const dispatch = useAppDispatch();
  const { isConfirmOpen, confirmMessage, onConfirm } = useAppSelector(
    (state) => state.modals
  );

  const handleConfirm = () => {
    onConfirm();
    dispatch(closeConfirm());
  };

  const handleClose = () => {
    dispatch(closeConfirm());
  };

  useEffect(() => {
    const listenForEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dispatch(closeConfirm());
      }
    };

    if (isConfirmOpen) {
      window.addEventListener("keyup", listenForEscape);
    } else {
      window.removeEventListener("keyup", listenForEscape);
    }

    return () => document.removeEventListener("keyup", listenForEscape);
  }, [isConfirmOpen]);

  return (
    <AnimatePresence>
      {isConfirmOpen && (
        <motion.div
          onClick={handleClose}
          key="confirmModal"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="w-full h-full absolute top-0 left-0 p-5 z-50"
        >
          <div className="w-full h-48 p-4 absolute bottom-0 left-0">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-emerald-300 rounded-xl h-full w-full flex flex-col p-3"
            >
              <div className="flex-1 items-center justify-center flex text-gray-800 text-center">
                {confirmMessage}
              </div>
              <div className="flex justify-center items-center space-x-1">
                <button
                  onClick={handleConfirm}
                  className="bg-black bg-opacity-10 px-3 py-1 rounded-xl min-w-[60px] hover:bg-opacity-20 active:bg-opacity-25 text-gray-700 h-10"
                >
                  OK
                </button>
                <button
                  onClick={handleClose}
                  className="bg-black bg-opacity-10 px-3 py-1 rounded-xl min-w-[60px] hover:bg-opacity-20 active:bg-opacity-25 text-gray-700 h-10"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {!isConfirmOpen && null}
    </AnimatePresence>
  );
};
