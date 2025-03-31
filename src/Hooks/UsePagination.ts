// falta test
import { MappedProductResponse } from "@/models/product.model";
import { getAllProducts } from "@/services/api.service";
import { useEffect, useState } from "react";

type ErrorType = Error | null;

interface Params {
    data: MappedProductResponse | null;
    loading: boolean;
    error: ErrorType;
    total: number;
    currentPage: number;
    nextPage: () => void;
    prevPage: () => void;
    skip: number;
    limit: number
}

export const UsePagination = (
): Params => {
    const [data, setData] = useState<MappedProductResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorType>(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 16;
    const skip = (currentPage - 1) * Number(limit);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await getAllProducts(String(limit), String(skip));
                setData(response);
                setError(null);
                setTotal(response.total);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, limit, skip]);

    const nextPage = () => {
        if (currentPage < Math.ceil(total / limit)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return { data, total, currentPage, nextPage, prevPage, loading, error, skip, limit };
};
