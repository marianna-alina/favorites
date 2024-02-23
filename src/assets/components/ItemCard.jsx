import { IoHeartDislikeOutline } from "react-icons/io5";
import { convertToUppercase } from "../utils/stringFunctions";
import { MdOutlineModeEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";

export default function ItemCard({
  item,
  deleteItem,
  handleClickOpen,
  handleClose,
  isDialogOpen,
}) {
  const { categoryID, itemId } = useParams();

  return (
    <div className="bg-white/20 rounded-lg p-3 ">
      <div className="flex justify-end">
        <Tooltip title="Delete">
          <button>
            <IoHeartDislikeOutline size={30} onClick={handleClickOpen} />
          </button>
          <Dialog
            open={isDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                By clicking yes, you are deleting this item.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button onClick={handleClose}>Cancel</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </DialogActions>
          </Dialog>
        </Tooltip>
        <Tooltip title="Edit">
          <Link
            to={`/categories/${categoryID}/items/${itemId}/edit`}
            state={{ item: item }}
          >
            <MdOutlineModeEdit size={30} />
          </Link>
        </Tooltip>
      </div>

      <Link
        className="text-left w-48 flex justify-between gap-6 flex flex-col sm:flex-row"
        to={`items/${item.id}`}
      >
        {item.img && <img src={item.img} className="object-contain" />}
        <div>
          {Object.entries(item)
            .filter(
              (entry) =>
                !entry.includes("id") &&
                !entry.includes("category_id") &&
                !entry.includes("categoryId") &&
                !entry.includes("img")
            )

            .map((entry, index) => (
              <div key={index} className="w-40 ">
                {entry[0] === "name" ? (
                  <h1 className="text-lg text-left text-2xl mb-6 w-80">
                    <b>{entry[1]}</b>
                  </h1>
                ) : (
                  <p className="text-lg text-left w-60 ">
                    <b>{convertToUppercase(entry[0])}</b>: {entry[1]}
                  </p>
                )}
              </div>
            ))}
        </div>
      </Link>
    </div>
  );
}
