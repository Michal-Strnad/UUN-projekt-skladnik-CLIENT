const url = "http://localhost:3000";

async function fetchData(url, option, dToIn) {
    let response = await fetch(`${url}/${option}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dToIn)
    });

    const data = await response.json();
    return {ok: response.ok, status: response.status, data: data};
}

const fetchHelper = {
    employee: {
        create: async (dToIn) => {
            return await fetchData(url, 'employee/create', dToIn);
        },
        get: async (dToIn) => {
            return await fetchData(url, 'employee/get', dToIn);
        },
        getAll: async (dToIn) => {
            return await fetchData(url, 'employee/getAll', dToIn);
        },
        getByToolId: async (dToIn) => {
            return await fetchData(url, 'employee/getByToolId', dToIn);
        },
        update: async (dToIn) => {
            return await fetchData(url, 'employee/update', dToIn);
        },
        remove: async (dToIn) => {
            return await fetchData(url, 'employee/remove', dToIn);
        }
    },
    tool: {
        create: async (dToIn) => {
            return await fetchData(url, 'tool/create', dToIn);
        },
        get: async (dToIn) => {
            return await fetchData(url, 'tool/get', dToIn);
        },
        getAll: async (dToIn) => {
            return await fetchData(url, 'tool/getAll', dToIn);
        },
        update: async (dToIn) => {
            return await fetchData(url, 'tool/update', dToIn);
        },
        remove: async (dToIn) => {
            return await fetchData(url, 'tool/remove', dToIn);
        }
    }
};

export default fetchHelper;