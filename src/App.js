import React, { useState } from 'react'

const App = () => {
  //to store the userInput Data
  const [search, setSearch] = useState('');
  //to store the API Data
  const [data, setData] = useState([]);
  const submitHandler = e => {
    e.preventDefault();  //when we are submitting the form, not to refresh the Whole Page, if it refresh means whole data will be lost
    //                                                         replace the http://www.omdbapi.com/?i=${search}&apikey=838019d3 with  s=${search}            
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=838019d3`).then(     //`http://www.omdbapi.com/?s=${search}&apikey=838019d3` backticks are used beacuse of w're using Dynamic {Search} Key
      response => response.json()
    ).then(value => {
      setData(value.Search);
    })
  }

  {/* when we click the download button, we can pass the image URl . By using the buffer we can create an Obj URl. we have created a link by using anchor Tag. 
      we have  Passed the OBJURL to that anchor tag */}

  const download = url => {
    fetch(url).then(response => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
      });
    })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className=' shadow mt-3 p-3'>
      <center>

        <h1>Search Your Favorite Movie</h1>
        <form onSubmit={submitHandler}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} /><br /><br />
          <input className='btn btn-success' type="submit" value="Search" />
        </form>

        <div className='container'>
          <div className="row" >
            {/* whenever you are taking data from API , first check the length by ternary operator */}
            {data.length >= 1 ? data.map(movie =>
              <div className="col-md-4" key={movie.imdbID}>
                <div className="card" style={{ "width": "18rem" }}>
                  <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                  <div className="card-body">
                    <h4 className="card-title">{movie.Title}</h4>
                    {/* we can't directly download api Images, we can download by Object Urls Only */}
                    <a className="btn btn-primary" onClick={() => download(movie.Poster)}>Download Poster</a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </center>
    </div>
  )
}

export default App


{/*  If our images is taken from our Local Folder we have to use this in href= {} and use download <a href={movie.Poster} className="btn btn-primary" download>Download Poster</a>   */ }