const Song = require('../models/song');

// Create a new song
exports.createSong = async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.status(201).json({ success: true, song });
    } catch (error) {
        res.status(400).send(error);
    }
};


// Get all songs
exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).send(songs);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a song
exports.updateSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!song) {
            return res.status(404).send();
        }
        res.status(200).send(song);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a song
exports.deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).send();
        }
        res.status(201).json({ success: "Deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get statistics
// exports.getStatistics = async (req, res) => {
//     try {
//         const totalSongs = await Song.countDocuments();
//         const totalArtists = await Song.distinct('artist').count();
//         const totalAlbums = await Song.distinct('album').count();
//         const totalGenres = await Song.distinct('genre').count();

//         const songsByGenre = await Song.aggregate([
//             { $group: { _id: "$genre", count: { $sum: 1 } } }
//         ]);

//         const songsByArtist = await Song.aggregate([
//             { $group: { _id: "$artist", songs: { $sum: 1 }, albums: { $addToSet: "$album" } } },
//             { $project: { _id: 1, songs: 1, albums: { $size: "$albums" } } }
//         ]);

//         const songsByAlbum = await Song.aggregate([
//             { $group: { _id: "$album", count: { $sum: 1 } } }
//         ]);

//         res.status(200).send({
//             totalSongs,
//             totalArtists,
//             totalAlbums,
//             totalGenres,
//             songsByGenre,
//             songsByArtist,
//             songsByAlbum
//         });
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error);
//     }
// };

exports.getStatistics = async (req, res) => {
    try {
      const totalSongs = await Song.countDocuments();
      const totalArtists = await Song.distinct('artist').length;
      const totalAlbums = await Song.distinct('album').length;
      const totalGenres = await Song.distinct('genre').length;
  
      const songsByGenre = await Song.aggregate([
        { $group: { _id: "$genre", count: { $sum: 1 } } }
      ]);
  
      const songsByArtist = await Song.aggregate([
        { $group: { _id: "$artist", songs: { $sum: 1 }, albums: { $addToSet: "$album" } } },
        { $project: { _id: 1, songs: 1, albums: { $size: "$albums" } } }
      ]);
  
      const songsByAlbum = await Song.aggregate([
        { $group: { _id: "$album", count: { $sum: 1 } } }
      ]);
  
      res.status(200).json({
        success: true,
        data: {
          totalSongs,
          totalArtists,
          totalAlbums,
          totalGenres,
          songsByGenre,
          songsByArtist,
          songsByAlbum
        }
      });
    } catch (error) {
      console.error('Error getting song statistics:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };


