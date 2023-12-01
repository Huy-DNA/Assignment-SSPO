import { v4 as uuidv4 } from 'uuid';

export const configs = {
  allowedFormats: ['docx', 'pptx', 'odt', 'pdf', 'png', 'svg', 'jpg', 'jpeg'],
  allowedPageSize: new Map([
    { name: 'a3', equiv: 2, id: uuidv4() },
    { name: 'a4', equiv: 1, id: uuidv4() },
  ].map((e) => [e.id, e])),
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
  isAllowed(id) {
    return configs.allowedPageSize.has(id);
  },
  addPageSize({ name, equiv, id }) {
    if (pageSizeConfig.isAllowed(id)) {
      return;
    }
    configs.allowedPageSize.set(id, { name, equiv, id });
  },
  updatePageSize({ name, equiv, id }) {
    if (pageSizeConfig.isAllowed(id)) {
      const pageSize = configs.allowedPageSize.get(id);
      pageSize.name = name || pageSize.name;
      pageSize.equiv = equiv || pageSize.equiv;

      return;
    }
    pageSizeConfig.addPageSize({ name, equiv, id });
  },
  rmPageSize(id) {
    configs.allowedPageSize.delete(id);
  },
};
