import { useState, useEffect } from 'react';
import { clientDelele, clientGet, clientPost, clientPut } from '../utils/axios';
import useLoading from './useLoading';

const useFetch = (url, options = { fetch: true }) => {
  const { onOpenLoading, onCloseLoading } = useLoading();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clientGet(url);
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 1000)
      } catch (error) {
        setError(error)
      }
    }

    if (options.fetch) {
      fetchData();
    }
  }, [url, options.fetch])

  const post = async (body) => {
    onOpenLoading();
    try {
      const response = await clientPost(url, body);
      setData(response.data);
      onCloseLoading();
    } catch (error) {
      setError(error);
      onCloseLoading();
    }
  };

  const put = async (url, body) => {
    onOpenLoading();
    try {
      const response = await clientPut(url, body);
      setData(response.data);
      onCloseLoading();
    } catch (error) {
      setError(error);
      onCloseLoading();
    }
  };

  const remove = async (url) => {
    onOpenLoading();
    try {
      const response = await clientDelele(url);
      setTimeout(() => {
        setData(null);
        onCloseLoading();
      }, 500)
    } catch (error) {
      onCloseLoading();
      setError(error);
    }
  };

  return { data, loading, error, post, put, remove };
}


export default useFetch;
