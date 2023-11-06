import React from "react";

const EditPrinter = ({
    editPrinter,
    handleEdit,
}) => {
    return (
    // <div className={cx('wrapper')}>
    //     <button type="submit">Hoàn tất</button>
    // </div>
    <tr>
      <td>
        <input
          type="number"
          required="required"
          placeholder=""
          name="id"
          value={editFormData.id}
          onChange={editPrinter}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder=""
          name="name"
          value={editPrinter.name}
          onChange={handleEdit}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder=""
          name="location"
          value={editPrinter.location}
          onChange={handleEdit}
        ></input>
      </td>
      <td>
        <select
            name="enable"
            onChange={handleEdit}
            value={editPrinter.enable}
            >
            <option>Available</option>
            <option>Unavailable</option>
        </select>
      </td>
    </tr>
    );
};

export default EditPrinter;
