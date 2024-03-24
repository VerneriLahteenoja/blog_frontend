
const Notification = ({ message, success }) => {
    const isSuccessful = success ? "success" : "error"
    if (message === null) {
      return null
    }
    return (
      <div className={isSuccessful}>
        {message}
      </div>
    )
  }

export default Notification