import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { DELETE_PACKAGES_URL, GET_PACKAGES_URL, UPDATE_PACKAGES_URL, UPLOAD_PACKAGES_URL } from '../../constants/url';
import extractAPIResponse from '../../utils/extractAPIResponse';
import images from '../../../assets/images/images';
import { CircularProgress, Dialog } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import useNotification from '../../hooks/useNotification';
import { NotificationStatus } from '../../constants/notification';

function ImageUrlDialog({ open, onClose, onSubmit }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <div className="bg-white rounded-lg border-none">
        <div className="bg-blue-950 w-full">
          <label htmlFor="imageUrl" className="text-white font-bold p-5">Image URL</label>
        </div>
        <div className="p-5">
          <input type="url" id="imageUrl" className="p-1 bg-gray-100 border-2 border-gray-500 active:border-gray-700 rounded-lg mb-2" placeholder="https://"/>
          <div className="flex flex-row items-start gap-2">
            <button onClick={onClose} className="text-sm text-white bg-red-500 active:bg-red-700 rounded-lg p-1">Cancel</button>
            <button onClick={onSubmit} className="text-sm text-white bg-blue-500 active:bg-blue-700 rounded-lg p-1">Submit</button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default function PaperPackageList() {
  const notify = useNotification();
  const [packageList, setPackageList] = useState(null);
  const [packageWithImageModal, setPackageWithImageModal] = useState(null);
  const [newPackageWithImageModal, setNewPackageWithImageModal] = useState(null);
  const [nextFakeId, setNextFakeId] = useState(0);
  const [newPackageList, setNewPackageList] = useState([]);

  useEffect(() => {
    axios.get(GET_PACKAGES_URL)
      .then(({ data }) => extractAPIResponse(data))
      .then((rows) => rows.map((row) => ({ ...row, inEditMode: false })))
      .then(setPackageList)
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  const setEditMode = (id) => {
    setPackageList((pkgs) => pkgs.map((pkg) => pkg.id === id ? {...pkg, inEditMode: true} : pkg));
  }

  const handleAddPackage = () => {
    setNextFakeId((fakeId) => fakeId + 1);
    setNewPackageList((pkgs) => [...pkgs, { fakeId: nextFakeId, name: '', price: 0, paperNo: 0, description: '', thumbnailUrl: '' }]);
  }

  const handleCancelUpload = (id) => {
    setNewPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ fakeId }) => fakeId === id);
      return [...pkgs.slice(0, pkgIndex), ...pkgs.slice(pkgIndex + 1)];
    });
  }

  const handleSave = async (id) => {
    if (!packageList) {
      return;
    }

    const pkgIndex = packageList.findIndex(({ id: _id }) => _id === id);
    if (pkgIndex === -1) {
      return;
    }
    notify(NotificationStatus.WAITING);
  
    try {
      const newPkg = await axios.post(UPDATE_PACKAGES_URL, {...packageList[pkgIndex], createdAt: undefined, inEditMode: undefined})
        .then(({ data }) => extractAPIResponse(data))
      
      setPackageList((pkgs) => {
        const pkgIndex = packageList.findIndex(({ id: _id }) => _id === id);
        if (pkgIndex === -1) {
          return pkgs;
        }
        notify(NotificationStatus.OK);
        return [...pkgs.slice(0, pkgIndex), {...newPkg, inEditMode: false}, ...pkgs.slice(pkgIndex + 1)];
      });
    } catch (e) {
      notify(NotificationStatus.ERR, e.message);
    }
  }

  const handleDelete = async (id) => {
    notify(NotificationStatus.WAITING);
    try {
      await axios.post(DELETE_PACKAGES_URL, [id])
        .then(({ data }) => extractAPIResponse(data));
      setPackageList((pkgs) => {
        const pkgIndex = pkgs.findIndex(({ id: _id }) => _id === id);
        return [...pkgs.slice(0, pkgIndex), ...pkgs.slice(pkgIndex + 1)];
      });
      notify(NotificationStatus.OK);
    } catch (e) {
      notify(NotificationStatus.ERR, e.message);
    }
  }

  const handleUpload = async (id) => {
    const pkgIndex = newPackageList.findIndex(({ fakeId }) => fakeId === id);
    notify(NotificationStatus.WAITING);
    try {
      const newPkg = await axios.post(UPLOAD_PACKAGES_URL, {...newPackageList[pkgIndex], inEditMode: undefined, createdAt: undefined, fakeId: undefined})
        .then(({ data }) => extractAPIResponse(data));

      setNewPackageList((pkgs) => {
        const pkgIndex = pkgs.findIndex(({ fakeId }) => fakeId === id);
        return [...pkgs.slice(0, pkgIndex), ...pkgs.slice(pkgIndex + 1)];
      });

      setPackageList((pkgs) => [...pkgs, {...newPkg, inEditMode: false}])
      notify(NotificationStatus.OK);
    } catch (e) {
      notify(NotificationStatus.ERR, e.message);
    }
  }

  const handleNewPackageDescriptionChange = (id, newDescription) => {
    setNewPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ fakeId }) => fakeId === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, description: newDescription}, ...pkgs.slice(pkgIndex + 1)]
    });
  };
  
  const handleNewPackageNameChange = (id, newName) => {
    setNewPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ fakeId }) => fakeId === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, name: newName}, ...pkgs.slice(pkgIndex + 1)]
    });
  };

  const handleNewPackagePaperNoChange = (id, newPaperNo) => {
    setNewPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ fakeId }) => fakeId === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, paperNo: newPaperNo}, ...pkgs.slice(pkgIndex + 1)]
    });
  };

  const handleNewPackagePriceChange = (id, newPrice) => {
    setNewPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ fakeId }) => fakeId === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, price: newPrice}, ...pkgs.slice(pkgIndex + 1)]
    });
  };
  
  const handlePackageDescriptionChange = (id, newDescription) => {
    setPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ id: _id }) => _id === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, description: newDescription}, ...pkgs.slice(pkgIndex + 1)]
    });
  };
  
  const handlePackageNameChange = (id, newName) => {
    setPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ id: _id }) => _id === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, name: newName}, ...pkgs.slice(pkgIndex + 1)]
    });
  };

  const handlePackagePaperNoChange = (id, newPaperNo) => {
    setPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ id: _id }) => _id === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, paperNo: newPaperNo}, ...pkgs.slice(pkgIndex + 1)]
    });
  };

  const handlePackagePriceChange = (id, newPrice) => {
    setPackageList((pkgs) => {
      const pkgIndex = pkgs.findIndex(({ id: _id }) => _id === id);
      if (pkgIndex === -1) {
        return pkgs;
      }
      const pkg = pkgs[pkgIndex];
      return [...pkgs.slice(0, pkgIndex), {...pkg, price: newPrice}, ...pkgs.slice(pkgIndex + 1)]
    });
  };

  return (
    <>
      <ImageUrlDialog
        open={packageWithImageModal !== null}
        onClose={() => setPackageWithImageModal(null)}
      />
      <ImageUrlDialog
        open={newPackageWithImageModal !== null}
        onClose={() => setNewPackageWithImageModal(null)}
      />
      <>
        <div className="grid grid-cols-[1fr_2fr_6fr_12fr] lg:grid-cols-[1fr_2fr_12fr_24fr] gap-8 p-5">
          {
            !packageList ? 
              <div className="flex flex-row justify-center items-center h-full">
                <CircularProgress size={80} />
              </div> : (
                <>
                  {
                    packageList.map(({ id, name, thumbnailUrl, description, price, paperNo, inEditMode }) => (
                      <Fragment key={id}>
                        <div className="flex flex-col gap-2 justify-start">
                          {
                            inEditMode ? 
                              <button onClick={() => handleSave(id)} className="text-xs text-white bg-blue-500 active:bg-blue-700 rounded-lg p-1"> Lưu </button> :
                              <button onClick={() => setEditMode(id)} className="text-xs text-white bg-yellow-500 active:bg-yellow-700 rounded-lg p-1">Sửa</button>
                          }
                          <button onClick={() => handleDelete(id)} className="text-xs text-white bg-red-500 active:bg-red-700 rounded-lg p-1">Xóa</button>
                        </div>
                        <div className="flex flex-row items-start">
                          {
                            !inEditMode ?
                              <img src={thumbnailUrl || images.paper} className="block w-full" /> :
                              <img src={thumbnailUrl || images.paper} className="block w-full hover:cursor-pointer" onClick={() => setPackageWithImageModal(id)}/>
                          }
                        </div>
                        <div>
                          {
                            inEditMode ?
                            <>
                              <input className="bg-gray-100 border-gray-500 border-2 active:border-gray-500 mb-2 rounded-lg p-1" value={name} onChange={(e) => handlePackageNameChange(id, e.target.value)}/>
                              <p className="text-blue-800 font-bold text-lg mb-2">₫ <input type="number" className="bg-gray-100 border-gray-500 border-2 active:border-gray-500 rounded-lg p-1" value={price} onChange={(e) => handlePackagePriceChange(id, e.target.value)} /></p>
                              <p className="font-light mb-2">Gồm <input type="number" min={0} className="p-1 bg-gray-100 font-bold border-gray-500 border-2 active:border-gray-500 rounded-lg" value={paperNo} onChange={(e) => handlePackagePaperNoChange(id, e.target.value)} /> tờ giấy</p>
                            </> :
                            <>
                              <p>{ name }</p>
                              <p className="text-blue-800 font-bold text-lg">₫ { price.toLocaleString() }</p>
                              <p className="font-light">Gồm <span className="font-bold">{ paperNo }</span> tờ giấy</p>
                            </>
                          }
                        </div>
                        <div className="overflow-auto flex flex-row items-stretch gap-1">
                          {
                            inEditMode ?
                              <>
                                <InfoIcon />
                                <textarea className="bg-gray-100 border-gray-500 border-2 active:border-gray-500 mb-2 rounded-lg p-1 w-full" placeholder="Enter the package description" onChange={(e) => handlePackageDescriptionChange(id, e.target.value)} />
                              </> :
                              <>
                                <InfoIcon />&nbsp;{ description }
                              </>
                          }
                        </div>
                      </Fragment>))
                    }
                  
                  {
                    newPackageList.map(({ fakeId, name, thumbnailUrl, description, price, paperNo }) => (
                      <Fragment key={fakeId}>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => handleUpload(fakeId)} className="text-xs text-white bg-blue-500 active:bg-blue-700 rounded-lg p-1">Lưu</button>
                          <button onClick={() => handleCancelUpload(fakeId)} className="text-xs text-white bg-red-500 active:bg-red-700 rounded-lg p-1">Xóa</button>
                        </div>
                        <div className="flex flex-row items-start">
                          <img src={thumbnailUrl || images.paper} className="block w-full hover:cursor-pointer" onClick={() => setNewPackageWithImageModal(fakeId)}/>
                        </div>
                        <div>
                          <input className="bg-gray-100 border-gray-500 border-2 active:border-gray-500 mb-2 rounded-lg p-1" value={name} onChange={(e) => handleNewPackageNameChange(fakeId, e.target.value)}/>
                          <p className="text-blue-800 font-bold text-lg mb-2">₫ <input type="number" className="bg-gray-100 border-gray-500 border-2 active:border-gray-500 rounded-lg p-1" value={price} onChange={(e) => handleNewPackagePriceChange(fakeId, e.target.value)}/></p>
                          <p className="font-light mb-2">Gồm <input type="number" min={0} className="p-1 bg-gray-100 font-bold border-gray-500 border-2 active:border-gray-500 rounded-lg" value={paperNo} onChange={(e) => handleNewPackagePaperNoChange(fakeId, e.target.value)} /> tờ giấy</p>
                        </div>
                        <div className="flex flex-row items-stretch gap-1">
                          <InfoIcon />
                          <textarea className="bg-gray-100 border-gray-500 border-2 active:border-gray-500 mb-2 rounded-lg p-1 w-full" placeholder="Enter the package description" value={description} onChange={(e) => handleNewPackageDescriptionChange(fakeId, e.target.value)} />
                        </div>
                      </Fragment>
                    ))
                  }
                  <>
                    <div>

                    </div>
                    <div onClick={handleAddPackage} className="flex flex-row items-center justify-center bg-blue-300 rounded-lg aspect-square hover:cursor-pointer">
                      <AddIcon className="text-white" />
                    </div>
                  </>
                </>
              )
          }
        </div>
      </>
    </>
  )
}
