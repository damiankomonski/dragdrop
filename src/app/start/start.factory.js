const loadFileFactory = ($resource) => {
    return $resource('./src/app/data.json');
};

export default loadFileFactory;