package utils

func NotFound() map[string]interface{} {
	err := make(map[string]interface{})
	err["error"] = "resource not found"
	return err
}

func AccessForbidden() map[string]interface{} {
	err := make(map[string]interface{})
	err["error"] = "access forbidden"
	return err
}

func ErrorMessage(message string) map[string]interface{} {
	err := make(map[string]interface{})
	err["error"] = message
	return err
}
