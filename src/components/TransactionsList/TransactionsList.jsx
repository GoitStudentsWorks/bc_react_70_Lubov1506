import TransactionsDescItem from '../TransactionsDescItem/TransactionsDescItem';
import TransactionsMobileItem from '../TransactionsMobileItem/TransactionsMobileItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactions } from '../../redux/transactions/selectors';
import { useEffect, useState } from 'react';
import {
  deleteTrnThunk,
  fetchAllTrnThunk,
} from '../../redux/transactions/operations';

import s from './TransactionsList.module.css';
import EmptyHistory from 'components/EmptyHistory/EmptyHistory';
import { useMedia } from 'hooks';
import { toast } from 'react-toastify';
import { toastStyles } from 'components/Toast/toastStyles';

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions).toSorted(
    (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
  );
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [deletedId, setDeletetId] = useState(null);
  useEffect(() => {
    dispatch(fetchAllTrnThunk());
  }, [dispatch]);

  const { isTablet } = useMedia();

  const handleDelete = transactionId => {
    let undo = false;
    setPending(true);
    setDeletetId(transactionId);
    const toastId = toast(
      <div className={s.undelete_toast}>
        <button
          className={s.delete_btn}
          onClick={() => {
            toast.dismiss(toastId);
          }}
        >
          Delete
        </button>
        <button
          className={s.undelete_btn}
          onClick={() => {
            undo = true;
            setPending(false);
            toast.dismiss(toastId, toastStyles);
          }}
        >
          Undelete
        </button>
      </div>,
      {
        onClose: () => {
          if (!undo) {
            setPending(false);
            dispatch(deleteTrnThunk(transactionId));
          }
        },
        autoClose: 3000,
        closeOnClick: false,
      }
    );
  };

  if (!transactions.length) {
    return <EmptyHistory />;
  }
  return (
    <>
      {isTablet ? (
        <table className={s.table}>
          <thead className={s.thead}>
            <tr className={s.t_row}>
              <td className={s.title}>Date</td>
              <td className={s.title}>Type</td>
              <td className={s.title}>Category</td>
              <td className={s.title}>Comment</td>
              <td className={s.title}>Sum</td>
              <td className={s.title}></td>
            </tr>
          </thead>
          <tbody>
            {transactions.map(item => (
              <TransactionsDescItem
                key={item.id}
                item={item}
                pending={pending}
                deletedId={deletedId}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <ul className={s.list}>
          {transactions.map(item => (
            <TransactionsMobileItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TransactionsList;
