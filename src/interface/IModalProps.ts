/**
 * IModalProps
 */
export default interface IModalProps<T = any> {
  open: boolean;
  onSuccess?: (data?: T) => void;
  onCancel: () => void;
}
