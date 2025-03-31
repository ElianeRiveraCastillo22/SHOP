// test
export const mockFetch = <T>(
    data: T,
    status: number = 200,
    ok: boolean = true
): jest.Mock => {
    const fn = jest.fn().mockImplementationOnce(() => {
        const response = {
            ok,
            status,
            json: () => Promise.resolve(data),
            blob: () => Promise.resolve(data),
            clone: () => ({ ...response }),
            text: () => Promise.resolve(JSON.stringify(data)),
        };
        return Promise.resolve(response);
    });

    global.fetch = fn;
    return fn;
};