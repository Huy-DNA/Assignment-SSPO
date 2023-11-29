export const configs = {
  allowedFormats: ['docx', 'pptx', 'odt', 'pdf', 'png', 'svg', 'jpg', 'jpeg'],
  allowedPageSize: ['a3', 'a4'],
};

export const formatConfig = {
  isAllowed(format) {
    return configs.allowedFormats.includes(format.toLowerCase().trim());
  },
  addFormat(format) {
    if (formatConfig.isAllowed(format)) {
      return;
    }
    configs.allowedFormats.push(format.toLowerCase().trim());
  },
  rmFormat(format) {
    const normalizedFormat = format.toLowerCase().trim();
    const id = configs.allowedFormats.indexOf(normalizedFormat);
    configs.allowedFormats.splice(id, 1);
  },
};

export const pageSizeConfig = {
  isAllowed(pageSize) {
    return configs.allowedPageSize.includes(pageSize.toLowerCase().trim());
  },
  addFormat(pageSize) {
    if (pageSizeConfig.isAllowed(pageSize)) {
      return;
    }
    configs.allowedPageSize.push(pageSize.toLowerCase().trim());
  },
  rmFormat(pageSize) {
    const normalizedPageSize = pageSize.toLowerCase().trim();
    const id = configs.allowedPageSize.indexOf(normalizedPageSize);
    configs.allowedPageSize.splice(id, 1);
  },
};
