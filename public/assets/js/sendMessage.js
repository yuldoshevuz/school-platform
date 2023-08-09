const sendMessage = async (url, items) => {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...items })
    })

    return resp
}

export default sendMessage