const Notification = ({message, notificationType}) => {
    const notificationTypes = {'Accept': 'accept-notification', 'Error': 'error'}
    if(message === null) {
        return null
    }
    return (
        <div className={notificationTypes[notificationType]}>{message}</div>
    )
}
export default Notification