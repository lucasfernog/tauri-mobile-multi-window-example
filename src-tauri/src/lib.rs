// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(target_os = "ios")]
    let mut counter = 0;
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_log::Builder::default()
                .level(log::LevelFilter::Info)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::default()).build()?;
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(move |app, event| {
            #[cfg(target_os = "ios")]
            if let tauri::RunEvent::SceneRequested { .. } = event {
                counter += 1;
                tauri::WebviewWindowBuilder::new(
                    app,
                    format!("main-{counter}"),
                    tauri::WebviewUrl::default(),
                )
                .build()
                .unwrap();
            }
            #[cfg(not(target_os = "ios"))]
            let (_app, _event) = (app, event);
        });
}
