import AlbumSchema from '../../models/album';
import PhotoSchema from '../../models/photo';

/**
 * @upload
 * /list:
 *   get:
 *     summary: CRUD Operations for upload
 *     tags:
 *       - upload
 */

export class UploadHandler {
  upload(req, res, next) {
    let uploadFile = req.files.file;
    const fileName = req.files.file.name;
    AlbumSchema.findById(req.params.id)
      .then(album => {
        uploadFile.mv(
          `${__dirname}/storage/albums/${album.name}/${fileName}`,
          (err) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.json({
              file: `/${uploadFile.name}`,
            });
          }
        );
        PhotoSchema.create({
          url: `/albums/${album.name}/${fileName}`,
          name: fileName,
          // album: req.params.selectedAlbum
      }).then(photo => {
        album.photos.push(photo._id);
        album.save((err, updatedAlbum) => {
          if (err) {
            res.status(500).send(err);
          } else {
            AlbumSchema.populate(updatedAlbum, { path: 'photos' }).then(some => {
              res.json(some);
            });
          }
        });
      }).catch(err => {
        console.log(err);
      });
    });
  }
}
